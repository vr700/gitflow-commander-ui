
import React from 'react';
import { Git, GitBranch, GitCommit, GitPullRequest, Copy, Download, Code, Edit, Upload } from 'lucide-react';

type FlowNode = {
  id: string;
  icon: React.ReactNode;
  label: string;
  status: 'pending' | 'active' | 'completed';
};

interface FlowDiagramProps {
  steps: FlowNode[];
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ steps }) => {
  return (
    <div className="flow-diagram flex flex-col items-center py-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`flow-node flow-node-${step.status}`}>
            <div className="flow-node-icon">
              {step.icon}
            </div>
            <div className="flow-node-label">{step.label}</div>
          </div>
          {index < steps.length - 1 && (
            <div className="flow-node-line"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const getFlowSteps = (formData: any): FlowNode[] => {
  const allStepsComplete = Boolean(
    formData.sshAccount && 
    formData.repoPath && 
    formData.folderName && 
    formData.commitType && 
    formData.issueTitle && 
    formData.baseBranch && 
    formData.pullBranch
  );

  const hasIssueNumber = formData.issueTitle && formData.issueTitle.includes('#');

  return [
    {
      id: 'clone',
      icon: <Download size={20} />,
      label: 'Clone',
      status: formData.sshAccount && formData.repoPath ? 'completed' : 'pending',
    },
    {
      id: 'checkout',
      icon: <GitBranch size={20} />,
      label: 'Checkout',
      status: formData.baseBranch ? 'completed' : 'pending',
    },
    {
      id: 'pull',
      icon: <Download size={20} />,
      label: 'Pull',
      status: formData.pullBranch ? 'completed' : 'pending',
    },
    {
      id: 'branch',
      icon: <GitBranch size={20} />,
      label: 'New Branch',
      status: formData.commitType && formData.issueTitle ? 'completed' : 'pending',
    },
    {
      id: 'code',
      icon: <Code size={20} />,
      label: 'Code',
      status: allStepsComplete ? 'active' : 'pending',
    },
    {
      id: 'commit',
      icon: <GitCommit size={20} />,
      label: 'Commit',
      status: 'pending',
    },
    {
      id: 'push',
      icon: <Upload size={20} />,
      label: 'Push',
      status: 'pending',
    },
    {
      id: 'pr',
      icon: <GitPullRequest size={20} />,
      label: 'PR',
      status: 'pending',
    },
  ];
};

export default FlowDiagram;
