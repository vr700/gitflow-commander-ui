
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const SSHKeysGuide: React.FC = () => {
  const [formData, setFormData] = useState({
    teamEmail: '',
    personalEmail: '',
    teamKeyName: 'id_ed25519_team',
    personalKeyName: 'id_ed25519_personal',
  });
  
  const [copiedCommands, setCopiedCommands] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCopyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommands((prev) => ({ ...prev, [id]: true }));
    toast.success('Command copied to clipboard');
    
    setTimeout(() => {
      setCopiedCommands((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  // Generate the commands based on the form data
  const generateTeamKeyCommand = `ssh-keygen -t ed25519 -C "${formData.teamEmail}" -f ~/.ssh/${formData.teamKeyName}`;
  const generatePersonalKeyCommand = `ssh-keygen -t ed25519 -C "${formData.personalEmail}" -f ~/.ssh/${formData.personalKeyName}`;
  const editConfigCommand = `nano ~/.ssh/config`;
  const sshConfigContent = `Host github.com-team
    HostName github.com
    User git
    IdentityFile ~/.ssh/${formData.teamKeyName}

Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/${formData.personalKeyName}`;
  
  const catTeamCommand = `cat ~/.ssh/${formData.teamKeyName}.pub`;
  const catPersonalCommand = `cat ~/.ssh/${formData.personalKeyName}.pub`;
  const testTeamCommand = `ssh -T git@github.com-team`;
  const testPersonalCommand = `ssh -T git@github.com-personal`;

  const CommandBlock = ({ command, id }: { command: string, id: string }) => (
    <div className={cn(
      'command-block relative bg-card/50 p-4 rounded-md mb-2',
      'border border-border/50 transition-colors duration-300',
      copiedCommands[id] && 'border-green-500/50'
    )}>
      <pre className="whitespace-pre-wrap break-all text-sm font-mono text-foreground/90">{command}</pre>
      <button 
        onClick={() => handleCopyCommand(command, id)} 
        className={cn(
          "command-copy-button absolute right-2 top-2 p-2 rounded-md",
          "hover:bg-accent transition-colors duration-200"
        )}
        aria-label="Copy command"
      >
        {copiedCommands[id] ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Copy size={16} className="text-muted-foreground" />
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">SSH Keys Setup Guide</h1>
            <p className="text-muted-foreground">Generate and set up your SSH keys for GitHub</p>
          </div>
          <Link to="/">
            <Button variant="outline">Back to GitFlow Commander</Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>SSH Key Information</CardTitle>
                <CardDescription>Enter your account details to generate commands</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamEmail">Team Email Address</Label>
                  <Input
                    id="teamEmail"
                    placeholder="team@company.com"
                    value={formData.teamEmail}
                    onChange={(e) => handleInputChange('teamEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="personalEmail">Personal Email Address</Label>
                  <Input
                    id="personalEmail"
                    placeholder="personal@email.com"
                    value={formData.personalEmail}
                    onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="teamKeyName">Team Key Filename</Label>
                  <Input
                    id="teamKeyName"
                    placeholder="id_ed25519_team"
                    value={formData.teamKeyName}
                    onChange={(e) => handleInputChange('teamKeyName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="personalKeyName">Personal Key Filename</Label>
                  <Input
                    id="personalKeyName"
                    placeholder="id_ed25519_personal"
                    value={formData.personalKeyName}
                    onChange={(e) => handleInputChange('personalKeyName', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 1: Generate SSH Keys</h2>
              <p className="text-sm text-muted-foreground mb-2">Run these commands in your terminal to generate your SSH keys:</p>
              
              <CommandBlock command={generateTeamKeyCommand} id="gen-team" />
              <CommandBlock command={generatePersonalKeyCommand} id="gen-personal" />
              
              <h2 className="text-xl font-semibold mt-8">Step 2: Configure SSH</h2>
              <p className="text-sm text-muted-foreground mb-2">Open your SSH config file:</p>
              <CommandBlock command={editConfigCommand} id="edit-config" />
              
              <p className="text-sm text-muted-foreground mb-2">Add the following content to your SSH config file:</p>
              <CommandBlock command={sshConfigContent} id="config-content" />
              
              <h2 className="text-xl font-semibold mt-8">Step 3: Add Keys to GitHub</h2>
              <p className="text-sm text-muted-foreground mb-2">Display your public key to copy:</p>
              <CommandBlock command={catTeamCommand} id="cat-team" />
              <CommandBlock command={catPersonalCommand} id="cat-personal" />
              
              <div className="p-4 bg-card rounded-md border mt-4 mb-4">
                <p className="text-sm">1. Copy the output of the command above</p>
                <p className="text-sm">2. Go to <a href="https://github.com/settings/ssh/new" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">GitHub SSH Settings</a></p>
                <p className="text-sm">3. Give your key a title (e.g., "Work Laptop Team" or "Work Laptop Personal")</p>
                <p className="text-sm">4. Paste your key in the "Key" field</p>
                <p className="text-sm">5. Click "Add SSH key"</p>
              </div>
              
              <h2 className="text-xl font-semibold mt-8">Step 4: Test Connection</h2>
              <p className="text-sm text-muted-foreground mb-2">Test your SSH connection with GitHub:</p>
              <CommandBlock command={testTeamCommand} id="test-team" />
              <CommandBlock command={testPersonalCommand} id="test-personal" />
              
              <div className="p-4 bg-card rounded-md border mt-4">
                <p className="text-sm">If successful, you'll see a message like:</p>
                <pre className="text-xs text-muted-foreground mt-2">Hi username! You've successfully authenticated, but GitHub does not provide shell access.</pre>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => window.open('https://docs.github.com/en/authentication/connecting-to-github-with-ssh', '_blank')}
                className="flex-1"
              >
                GitHub SSH Documentation
                <ExternalLink className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground mt-12">
        <div className="container">
          GitFlow Commander - Simplify your Git workflow
        </div>
      </footer>
    </div>
  );
};

export default SSHKeysGuide;
