
export interface FormData {
  sshAccount: string;
  repoPath: string;
  folderName: string;
  commitType: string;
  issueTitle: string;
  baseBranch: string;
  pullBranch: string;
  useSSH: boolean;
}

export function generateCommands(formData: FormData): { command: string; stepId: string }[] {
  if (!formData) return [];
  
  const { issueNumber, issueName } = parseIssueTitle(formData.issueTitle);
  
  // Prepare branch name
  let branchName = '';
  
  if (issueNumber) {
    branchName = `${formData.commitType}/${issueNumber}-${issueName}`;
  } else {
    branchName = `${formData.commitType}/${issueName}`;
  }
  
  // Generate commit message
  const commitMessage = `${formData.commitType}: ${issueName}`;
  
  // Format repository path based on SSH/HTTPS mode
  let cloneUrl = formData.repoPath;
  
  if (formData.useSSH) {
    // Handle SSH format
    if (cloneUrl.startsWith('http')) {
      // Convert HTTPS URL to SSH format if needed
      const urlParts = cloneUrl
        .replace('https://', '')
        .replace('http://', '')
        .replace('github.com/', 'github.com:')
        .replace('.git', '');
      cloneUrl = `git@${urlParts}.git`;
    }
    
    // Apply SSH account if needed
    if (formData.sshAccount) {
      cloneUrl = cloneUrl.replace(
        /git@github.com:/,
        `git@github.com-${formData.sshAccount}:`
      );
    }
  } else {
    // Handle HTTPS format
    if (cloneUrl.includes('git@github.com')) {
      // Convert SSH URL to HTTPS format
      cloneUrl = cloneUrl
        .replace(/git@github.com(-[^:]+)?:/, 'https://github.com/')
        .replace('.git', '');
      
      if (!cloneUrl.endsWith('.git')) {
        cloneUrl += '.git';
      }
    } else if (!cloneUrl.startsWith('http')) {
      // Add https:// prefix if missing
      cloneUrl = 'https://github.com/' + cloneUrl;
      if (!cloneUrl.endsWith('.git')) {
        cloneUrl += '.git';
      }
    }
  }
  
  // Generate commands
  return [
    { command: `git clone ${cloneUrl}`, stepId: 'clone' },
    { command: `cd ${formData.folderName}`, stepId: 'clone' },
    { command: `git checkout ${formData.baseBranch}`, stepId: 'checkout' },
    { command: `git pull origin ${formData.pullBranch}`, stepId: 'pull' },
    { command: `git checkout -b ${branchName}`, stepId: 'branch' },
    { command: `[Develop your code...]`, stepId: 'code' },
    { command: `git add .`, stepId: 'commit' },
    { command: `git commit -m "${commitMessage}"`, stepId: 'commit' },
    { command: `git push -u origin ${branchName}`, stepId: 'push' },
  ];
}
