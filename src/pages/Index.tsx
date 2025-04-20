
import React, { useState, useMemo, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ExternalLink } from 'lucide-react';
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

  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [useSSH, setUseSSH] = useState(true);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Reset completed steps when form changes
    setCompletedSteps([]);
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => [...new Set([...prev, stepId])]);
  };

  const handlePRComplete = () => {
    handleStepComplete('pr');
  };

  const commands = useMemo(() => generateCommands({ ...formData, useSSH }), [formData, useSSH]);
  const flowSteps = useMemo(() => getFlowSteps(formData, completedSteps), [formData, completedSteps]);

  const isFormComplete = Object.values(formData).every(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col justify-between space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
          {/* Left - Form and Commands */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">GitFlow Commander</h1>
              <p className="text-muted-foreground">Generate GitFlow commands for your workflow</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                checked={useSSH}
                onCheckedChange={setUseSSH}
                id="ssh-mode"
              />
              <label htmlFor="ssh-mode" className="text-sm font-medium">
                Use SSH Mode
              </label>
            </div>

            <GitFlowForm formData={formData} onChange={handleFormChange} />
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Generated Commands</h2>
              {commands.map((cmd, index) => (
                <CommandBlock 
                  key={index} 
                  command={cmd.command} 
                  index={index}
                  stepId={cmd.stepId}
                  onComplete={handleStepComplete}
                />
              ))}
              {!isFormComplete && (
                <div className="text-center p-8 text-muted-foreground">
                  <p>Complete the form to generate commands</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={handlePRComplete}
                className="w-full"
                disabled={!completedSteps.includes('push')}
              >
                I have made my Pull Request
              </Button>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://docs.github.com/en/authentication/connecting-to-github-with-ssh', '_blank')}
                  className="flex-1"
                >
                  How to set up your SSH keys
                  <ExternalLink className="ml-2" size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://docs.github.com/en', '_blank')}
                  className="flex-1"
                >
                  GitHub Docs
                  <ExternalLink className="ml-2" size={16} />
                </Button>
              </div>
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
