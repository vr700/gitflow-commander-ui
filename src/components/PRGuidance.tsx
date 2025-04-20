
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseIssueTitle } from '@/utils/commandGenerator';

interface PRGuidanceProps {
  issueTitle: string;
  commitType: string;
}

const PRGuidance: React.FC<PRGuidanceProps> = ({ issueTitle, commitType }) => {
  const { issueNumber, issueName } = parseIssueTitle(issueTitle);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pull Request Guidance</CardTitle>
        <CardDescription>Follow these steps after pushing your branch</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-md font-medium mb-2">1. Create a Pull Request on GitHub</h3>
          <p className="text-sm text-muted-foreground">Navigate to your repository on GitHub and look for the PR suggestion banner.</p>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">2. Use the commit message as PR title</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <code>{commitType}: {issueName}</code>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">3. In the PR body, include:</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            {issueNumber ? (
              <code>Closes #{issueNumber}</code>
            ) : (
              <code>Brief description of changes with screenshots if relevant</code>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PRGuidance;
