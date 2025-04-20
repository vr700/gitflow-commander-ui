
import React from 'react';
import { GitBranch, GitCommit, GitPullRequest, Download, Code, Upload } from 'lucide-react';
import { cn } from "@/lib/utils";

type NodeStatus = 'pending' | 'active' | 'completed';

export type FlowNode = {
  id: string;
  icon: React.ReactNode;
  label: string;
  status: NodeStatus;
};

interface FlowDiagramProps {
  steps: FlowNode[];
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ steps }) => {
  return (
    <div className="flow-diagram flex flex-col items-center py-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={cn(
            "flow-node",
            `flow-node-${step.status}`,
            "transition-all duration-300 ease-in-out"
          )}>
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

export const getFlowSteps = (formData: any, completedSteps: string[]): FlowNode[] => {
  const allStepsComplete = Boolean(
    formData.sshAccount && 
    formData.repoPath && 
    formData.folderName && 
    formData.commitType && 
    formData.issueTitle && 
    formData.baseBranch && 
    formData.pullBranch
  );

  return [
    {
      id: 'clone',
      icon: <Download size={20} />,
      label: 'Clone',
      status: completedSteps.includes('clone') ? 'completed' 
        : (formData.sshAccount && formData.repoPath ? 'active' : 'pending'),
    },
    {
      id: 'checkout',
      icon: <GitBranch size={20} />,
      label: 'Checkout',
      status: completedSteps.includes('checkout') ? 'completed' 
        : (formData.baseBranch ? 'active' : 'pending'),
    },
    {
      id: 'pull',
      icon: <Download size={20} />,
      label: 'Pull',
      status: completedSteps.includes('pull') ? 'completed'
        : (formData.pullBranch ? 'active' : 'pending'),
    },
    {
      id: 'branch',
      icon: <GitBranch size={20} />,
      label: 'New Branch',
      status: completedSteps.includes('branch') ? 'completed'
        : (formData.commitType && formData.issueTitle ? 'active' : 'pending'),
    },
    {
      id: 'code',
      icon: <Code size={20} />,
      label: 'Code',
      status: completedSteps.includes('code') ? 'completed'
        : (allStepsComplete ? 'active' : 'pending'),
    },
    {
      id: 'commit',
      icon: <GitCommit size={20} />,
      label: 'Commit',
      status: completedSteps.includes('commit') ? 'completed' : 'pending',
    },
    {
      id: 'push',
      icon: <Upload size={20} />,
      label: 'Push',
      status: completedSteps.includes('push') ? 'completed' : 'pending',
    },
    {
      id: 'pr',
      icon: <GitPullRequest size={20} />,
      label: 'PR',
      status: completedSteps.includes('pr') ? 'completed' : 'pending',
    },
  ];
};

export default FlowDiagram;
