
export interface FormData {
  sshAccount: string;
  repoPath: string;
  folderName: string;
  commitType: string;
  issueTitle: string;
  baseBranch: string;
  pullBranch: string;
}

export function parseIssueTitle(issueTitle: string): { issueNumber: string; issueName: string } {
  // Extract issue number if present
  const issueNumberMatch = issueTitle.match(/#(\d+)/);
  const issueNumber = issueNumberMatch ? issueNumberMatch[1] : '';
  
  // Create issue name by:
  // 1. Removing the issue number part
  // 2. Converting to lowercase
  // 3. Replace spaces with hyphens
  // 4. Remove special characters
  let issueName = issueTitle
    .replace(/#\d+/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  
  return { issueNumber, issueName };
}

export function generateCommands(formData: FormData): string[] {
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
  
  // Format repository path with SSH account
  const repoPathWithAccount = formData.repoPath.replace(
    /git@github.com:/,
    `git@github.com-${formData.sshAccount}:`
  );
  
  // Generate commands
  return [
    `git clone ${repoPathWithAccount}`,
    `cd ${formData.folderName}`,
    `git checkout ${formData.baseBranch}`,
    `git pull origin ${formData.pullBranch}`,
    `git checkout -b ${branchName}`,
    `[Develop your code...]`,
    `git add .`,
    `git commit -m "${commitMessage}"`,
    `git push -u origin ${branchName}`,
  ];
}
