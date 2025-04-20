
import React, { useState, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import FlowDiagram, { getFlowSteps } from '@/components/FlowDiagram';
import GitFlowForm from '@/components/GitFlowForm';
import CommandBlock from '@/components/CommandBlock';
import PRGuidance from '@/components/PRGuidance';
import { generateCommands } from '@/utils/commandGenerator';

const Index = () => {
  const [formData, setFormData] = useState({
    sshAccount: '',
    repoPath: '',
    folderName: '',
    commitType: '',
    issueTitle: '',
    baseBranch: '',
    pullBranch: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const commands = useMemo(() => generateCommands(formData), [formData]);
  const flowSteps = useMemo(() => getFlowSteps(formData), [formData]);

  const isFormComplete = Object.values(formData).every(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col justify-between space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
          {/* Left - Form and Commands */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">GitFlow Commander</h1>
              <p className="text-muted-foreground">Generate GitFlow commands for your workflow</p>
            </div>
            
            <GitFlowForm formData={formData} onChange={handleFormChange} />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Generated Commands</h2>
              {commands.length > 0 && (
                <div className="space-y-1">
                  {commands.map((cmd, index) => (
                    <CommandBlock key={index} command={cmd} index={index} />
                  ))}
                </div>
              )}
              {!isFormComplete && (
                <div className="text-center p-8 text-muted-foreground">
                  <p>Complete the form to generate commands</p>
                </div>
              )}
            </div>
            
            <PRGuidance issueTitle={formData.issueTitle} commitType={formData.commitType} />
          </div>
          
          {/* Right - Flow Diagram */}
          <div className="lg:w-1/4 max-w-xs mx-auto">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Workflow</h2>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <FlowDiagram steps={flowSteps} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container">
          GitFlow Commander - Simplify your Git workflow
        </div>
      </footer>
    </div>
  );
};

export default Index;
