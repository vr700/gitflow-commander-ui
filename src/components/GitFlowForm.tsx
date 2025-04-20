
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface GitFlowFormProps {
  formData: {
    sshAccount: string;
    repoPath: string;
    folderName: string;
    commitType: string;
    issueTitle: string;
    baseBranch: string;
    pullBranch: string;
    useSSH: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const COMMIT_TYPES = [
  { value: 'feat', label: 'feat - New feature' },
  { value: 'fix', label: 'fix - Bug fix' },
  { value: 'docs', label: 'docs - Documentation' },
  { value: 'style', label: 'style - Formatting' },
  { value: 'refactor', label: 'refactor - Code restructuring' },
  { value: 'test', label: 'test - Tests' },
  { value: 'chore', label: 'chore - Build/maintenance' },
  { value: 'perf', label: 'perf - Performance improvements' },
];

const GitFlowForm: React.FC<GitFlowFormProps> = ({ formData, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>GitFlow Command Generator</CardTitle>
        <CardDescription>Fill in the details to generate your GitFlow commands</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={formData.useSSH}
            onCheckedChange={(checked) => onChange('useSSH', checked)}
            id="ssh-mode"
          />
          <Label htmlFor="ssh-mode">Use SSH Mode</Label>
        </div>
        
        {formData.useSSH && (
          <div className="space-y-2">
            <Label htmlFor="sshAccount">SSH Account Name</Label>
            <Input
              id="sshAccount"
              placeholder="e.g., personal"
              value={formData.sshAccount}
              onChange={(e) => onChange('sshAccount', e.target.value)}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="repoPath">{formData.useSSH ? 'SSH Repository Path' : 'HTTPS Repository URL'}</Label>
          <Input
            id="repoPath"
            placeholder={formData.useSSH 
              ? "e.g., git@github.com:User/Repo.git" 
              : "e.g., https://github.com/User/Repo.git"}
            value={formData.repoPath}
            onChange={(e) => onChange('repoPath', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="folderName">Repository Folder Name</Label>
          <Input
            id="folderName"
            placeholder="e.g., my-project"
            value={formData.folderName}
            onChange={(e) => onChange('folderName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="commitType">Commit Type</Label>
          <Select
            value={formData.commitType}
            onValueChange={(value) => onChange('commitType', value)}
          >
            <SelectTrigger id="commitType">
              <SelectValue placeholder="Select commit type" />
            </SelectTrigger>
            <SelectContent>
              {COMMIT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="issueTitle">Issue Title</Label>
          <Input
            id="issueTitle"
            placeholder="e.g., Fix chapter 1 #89"
            value={formData.issueTitle}
            onChange={(e) => onChange('issueTitle', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="baseBranch">Base Branch for Merge</Label>
          <Input
            id="baseBranch"
            placeholder="e.g., main, develop"
            value={formData.baseBranch}
            onChange={(e) => onChange('baseBranch', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pullBranch">Branch to Pull Before Merge</Label>
          <Input
            id="pullBranch"
            placeholder="e.g., main, develop"
            value={formData.pullBranch}
            onChange={(e) => onChange('pullBranch', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GitFlowForm;
