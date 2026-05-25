---
id: 3009
title: Working with colab
date: "2026-05-25T06:00:00"
slug: working-with-colab
site: "https://thoughts.uncountable.uk"
wp_url: "https://thoughts.uncountable.uk"
root_slug: thoughts
site_name: My Thoughts
featured_media_url: null
featured_media_srcset: null
type: post
category:
  - name: Digital Life
    slug: digital-life
    id: 6
tag: []
---


<p class="wp-block-paragraph">There&#8217;s a cool free google account feature that tends to go somewhat under the radar.  It&#8217;s called Google Colab and allows you to author and execute Jupyter notebooks entirely online.</p>



<p class="wp-block-paragraph">I use them extensively for a botanical survey workflow for <a href="https://www.cotswolds-nl.org.uk/looking-after/our-grasslands-projects/glorious-cotswolds-grasslands/">Glorious Grasslands</a>.  The data is captured using Epicollect 5 and downloaded in their standard CSV format.  There&#8217;s an extensive set of scripts that take the raw data, perform all kinds of validation and the output spreadsheets in the format needed by the ecologists.</p>



<p class="wp-block-paragraph">There are two major shortcomings with Jupyter in general and Colab in particular which make is very tricky to control development:</p>



<ul class="wp-block-list">
<li>Jupyter notebooks store code and text and output in a single JSON file.  This means every time you execute it the file has changed, regardless of whether you have changed any core code.</li>



<li>The jupyter notebooks are stored in google drive which only has limited per-file versioning.  </li>
</ul>



<p class="wp-block-paragraph">When you execute a notebook, it creates a virtual python machine with the google drive mounted automatically.  It comes prebuilt with pandas and all the usual data science type tooling, but you are free to install any additional packages needed.</p>



<h3 class="wp-block-heading">Version control with git</h3>



<p class="wp-block-paragraph">I really needed proper version control so I can save snapshots of changes across multiple files in one go.  I thought initially of created a git folder right inside the google drive, but that would actually create a whole new world of pain with drive API syncing.</p>



<p class="wp-block-paragraph">So, instead, I hit upon the idea of checking out the git repo into an entirely separate folder in the virtual machine and then just copying the python notebooks across and using standard git commands from there.</p>



<p class="wp-block-paragraph">During the copy process, I can also remove the output cells and other runtime stuff that does not need to be version controlled.  This results in a single set of minimal, clean changes that can be committed with an appropriate message.</p>



<p class="wp-block-paragraph">There&#8217;s also a restore function which can take the latest commit (or any prior one) and copy the clean contents back into the colab google drive folder.  This is very useful when experimenting with a new feature, perhaps across multiple notebooks and then removing it cleanly if it didn&#8217;t work out.</p>



<p class="wp-block-paragraph">I&#8217;ve included the code below in case you ever need to do something similar.</p>



<pre class="wp-block-code"><code>import os
import json
import shutil
import subprocess
from google.colab import userdata

class ColabGitManager:
    def __init__(self, username, repo_name, email, name, drive_folder_path, repo_subfolder="",branch="main"):
        self.username = username
        self.repo_name = repo_name
        self.email = email
        self.name = name
        self.branch = branch
        self.drive_folder_path = drive_folder_path
        self.repo_subfolder = repo_subfolder.lstrip('/')
        self.repo_path = f"/content/{repo_name}"

        # Configure Git Identity globally within the runtime
        subprocess.run(&#91;"git", "config", "--global", "user.email", self.email])
        subprocess.run(&#91;"git", "config", "--global", "user.name", self.name])

    def _get_token(self):
        try:
            return userdata.get('GITHUB_TOKEN')
        except Exception:
            raise ValueError("❌ 'GITHUB_TOKEN' not found in Colab Secrets. Please add it.")

    def _ensure_repo_cloned(self):
        """Ensures the repository exists locally and fetches latest changes."""
        if not os.path.exists(self.repo_path):
            print(f"📦 First-time setup: Cloning {self.repo_name}...")
            token = self._get_token()
            clone_url = f"https://{token}@github.com/{self.username}/{self.repo_name}.git"
            res = subprocess.run(&#91;"git", "clone", clone_url, self.repo_path], capture_output=True, text=True)
            if res.returncode != 0:
                raise RuntimeError(f"❌ Clone failed: {res.stderr}")
        else:
            # Fetch remote updates so we are aware of all commit IDs
            subprocess.run(&#91;"git", "-C", self.repo_path, "fetch", "origin"])

    def _clean_notebook(self, file_path):
        """Strips output, execution counts, and Colab execution metadata from a notebook file."""
        import json

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                notebook = json.load(f)

            for cell in notebook.get('cells', &#91;]):
                # 1. Clean outputs and execution counts for code cells
                if cell.get('cell_type') == 'code':
                    cell&#91;'outputs'] = &#91;]
                    cell&#91;'execution_count'] = None

                # 2. Clean execution metadata added by Colab
                if 'metadata' in cell:
                    # Remove fields that change on execution or UI interaction
                    keys_to_remove = &#91;'executionInfo', 'outputId', 'colab']
                    for key in keys_to_remove:
                        if key in cell&#91;'metadata']:
                            del cell&#91;'metadata']&#91;key]

            # Write the cleaned JSON back to the file
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(notebook, f, indent=1, ensure_ascii=False)
                f.write('\n') # Ensure trailing newline

        except Exception as e:
            print(f"❌ Error cleaning {file_path}: {e}")

    def sync(self, commit_message, clean_outputs=True):
        """Copies from Drive, strips outputs, pushes to GitHub, and creates a concatenated txt backup."""
        self._ensure_repo_cloned()

        # Ensure we are on a clean, matching remote tracking state
        subprocess.run(&#91;"git", "-C", self.repo_path, "reset", "--hard", f"origin/{self.branch}"])

        dest_path = os.path.join(self.repo_path, self.repo_subfolder) if self.repo_subfolder else self.repo_path
        print(f"📂 Copying files to local repository tree...")
        shutil.copytree(self.drive_folder_path, dest_path, dirs_exist_ok=True)

        if clean_outputs:
            print("🧹 Stripping notebook execution counts and cell outputs...")
            for root, _, files in os.walk(dest_path):
                for file in files:
                    if file.endswith('.ipynb'):
                        self._clean_notebook(os.path.join(root, file))

        subprocess.run(&#91;"git", "-C", self.repo_path, "add", "."])
        commit_res = subprocess.run(&#91;"git", "-C", self.repo_path, "commit", "-m", commit_message], capture_output=True, text=True)

        if "nothing to commit" in commit_res.stdout or "nothing added to commit" in commit_res.stdout:
            print("ℹ️ No changes detected. Repository is already up to date.")
        else:
            print(f"🚀 Pushing clean changes to branch '{self.branch}'...")
            push_res = subprocess.run(&#91;"git", "-C", self.repo_path, "push", "origin", self.branch], capture_output=True, text=True)
            if push_res.returncode == 0:
                print("✅ Successfully synced clean notebooks to GitHub!")
            else:
                print("❌ Push failed:", push_res.stderr)
                return  # Exit early if the push fails so we don't backup a broken state

        # --- Create Concatenated Txt File of epicollect_forms and colab ---
        print(f"📦 Creating forms_code.txt backup...")
        try:
            # Uses the global PROJECT_ROOT_DIR variable
            txt_path = os.path.join(PROJECT_ROOT_DIR, "forms_code.txt")

            with open(txt_path, 'w', encoding='utf-8') as out_file:
                for folder_name in &#91;'epicollect_forms', 'colab']:
                    folder_path = os.path.join(self.repo_path, folder_name)

                    if os.path.exists(folder_path):
                        for root, _, files in os.walk(folder_path):
                            for file in files:
                                file_path = os.path.join(root, file)

                                # Create a conceptual Google Drive path for the AI's reference
                                rel_path = os.path.relpath(file_path, self.repo_path)
                                google_path = os.path.join(PROJECT_ROOT_DIR, rel_path)

                                # Write the delimiter
                                out_file.write(f"------FILE:  {google_path}--------\n")

                                # Write file contents safely
                                try:
                                    with open(file_path, 'r', encoding='utf-8') as in_file:
                                        out_file.write(in_file.read())
                                        out_file.write("\n\n")
                                except UnicodeDecodeError:
                                    out_file.write("&#91;Binary or unreadable file skipped]\n\n")
                    else:
                        print(f"⚠️ Warning: '{folder_name}' directory not found in repository. Skipping.")

            print(f"✅ Text backup successfully created at {txt_path}")

        except NameError:
            print("❌ Error: PROJECT_ROOT_DIR is not defined in this notebook. Could not save txt backup.")
        except Exception as e:
            print(f"❌ Error creating txt file: {e}")

    def restore(self, commit_id=None):
        """Extracts a folder configuration from a specific commit and pushes it back into Drive."""
        self._ensure_repo_cloned()

        # 1. Determine our target anchor (fallback to remote HEAD if no commit given)
        target = commit_id if commit_id else f"origin/{self.branch}"
        print(f"🔄 Pulling state from commit target: {target}...")

        # Clear out any uncommitted workspace mess before checking out files
        subprocess.run(&#91;"git", "-C", self.repo_path, "reset", "--hard", f"origin/{self.branch}"])

        # 2. Extract the specific folder from the target commit using checkout
        git_path = self.repo_subfolder if self.repo_subfolder else "."
        checkout_res = subprocess.run(&#91;"git", "-C", self.repo_path, "checkout", target, "--", git_path], capture_output=True, text=True)

        if checkout_res.returncode != 0:
            print(f"❌ Restore failed. Target commit or subfolder path not found:\n{checkout_res.stderr}")
            return

        src_path = os.path.join(self.repo_path, self.repo_subfolder) if self.repo_subfolder else self.repo_path
        if not os.path.exists(src_path):
            print(f"❌ Error: Path '{self.repo_subfolder}' was not found in commit context '{target}'.")
            return

        # 3. Write back to Google Drive
        print(f"⏪ Restoring files into Google Drive destination: {self.drive_folder_path}")
        shutil.copytree(src_path, self.drive_folder_path, dirs_exist_ok=True)

        # 4. Return local workspace tracking back to HEAD so subsequent actions don't skew
        subprocess.run(&#91;"git", "-C", self.repo_path, "reset", "--hard", f"origin/{self.branch}"])
        print("✅ Restore execution complete! Your Google Drive folder has been updated.")

</code></pre>
