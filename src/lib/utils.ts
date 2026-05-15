import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateScreeningLink(jobId: string): string {
  if (typeof window === 'undefined') {
    return `/screening/${jobId}`;
  }
  const baseUrl = window.location.origin;
  return `${baseUrl}/screening/${jobId}`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(true);
    } catch {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }

  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const jobDescriptions: Record<string, string> = {
  'Frontend-Focused Full Stack Developer': `We're looking for a talented Full Stack Developer to join our growing team. You'll work on modern web applications using React, Node.js, and PostgreSQL. Strong frontend skills are essential, with experience in responsive design and modern CSS frameworks.`,
  'Product Designer Intern': `Join our design team as an intern and work on real products used by thousands. You'll collaborate with engineers and product managers to design intuitive user interfaces. Experience with Figma and UI design principles is a plus.`,
  'Backend Engineer': `We need an experienced Backend Engineer to build scalable APIs and microservices. Proficiency in Node.js, Python, or Go is required. Experience with databases, caching, and cloud infrastructure is essential.`,
};

export const generateQuestionTemplates: Record<
  string,
  { text: string; responseType: 'text' | 'audio' }[]
> = {
  'job-001': [
    {
      text: 'Describe your experience with modern React patterns like hooks and context API. Can you give a specific example?',
      responseType: 'text',
    },
    {
      text: 'How would you optimize the performance of a slow React component? Walk us through your approach.',
      responseType: 'text',
    },
    {
      text: 'Tell us about your experience with responsive design and CSS. What frameworks do you prefer?',
      responseType: 'text',
    },
    {
      text: 'Describe a challenging bug you fixed. How did you debug and resolve it?',
      responseType: 'text',
    },
    {
      text: 'What is your experience with testing? Do you have experience with unit, integration, or end-to-end tests?',
      responseType: 'text',
    },
    {
      text: 'How do you approach learning new technologies and staying current with web development trends?',
      responseType: 'text',
    },
    {
      text: 'Describe your experience working with APIs and backend services. What patterns have you used?',
      responseType: 'text',
    },
  ],
  'job-002': [
    {
      text: "Walk us through a design project you're proud of. What was the problem and how did you solve it?",
      responseType: 'text',
    },
    {
      text: 'How do you approach user research and understanding user needs?',
      responseType: 'text',
    },
    {
      text: 'Describe your experience with design tools. Do you have a preferred tool and why?',
      responseType: 'text',
    },
    {
      text: 'Tell us about a time you received critical feedback on your design. How did you respond?',
      responseType: 'text',
    },
    {
      text: 'What design inspiration do you draw from? Can you share some designers or products you admire?',
      responseType: 'text',
    },
    {
      text: 'How do you ensure your designs are accessible to all users?',
      responseType: 'text',
    },
    {
      text: 'Describe your experience collaborating with engineers. How do you ensure your designs are feasible?',
      responseType: 'text',
    },
  ],
  'job-003': [
    {
      text: 'Describe your experience designing and building APIs. What standards and practices do you follow?',
      responseType: 'text',
    },
    {
      text: 'Tell us about your experience with databases. How do you optimize database queries?',
      responseType: 'text',
    },
    {
      text: 'Describe a system you built that needed to scale. What challenges did you face and how did you solve them?',
      responseType: 'text',
    },
    {
      text: "How do you approach security in backend systems? Give examples of security measures you've implemented.",
      responseType: 'text',
    },
    {
      text: 'Tell us about your experience with monitoring and debugging production systems.',
      responseType: 'text',
    },
    {
      text: 'Describe your experience with cloud platforms like AWS, Google Cloud, or Azure.',
      responseType: 'text',
    },
    {
      text: 'How do you approach writing clean, maintainable backend code? What patterns do you follow?',
      responseType: 'text',
    },
  ],
  'job-004': [
    {
      text: 'Describe your experience managing and optimizing cloud infrastructure.',
      responseType: 'text',
    },
    {
      text: 'How do you approach designing CI/CD pipelines? Can you give an example of a pipeline you built?',
      responseType: 'text',
    },
    {
      text: 'Tell us about your experience with containerization tools like Docker and Kubernetes.',
      responseType: 'text',
    },
    {
      text: 'Describe a time you had to deal with a critical production incident. What was your process for resolving it?',
      responseType: 'text',
    },
    {
      text: 'How do you ensure infrastructure security and compliance in your deployments?',
      responseType: 'text',
    },
    {
      text: 'What is your approach to infrastructure as code? What tools have you used?',
      responseType: 'text',
    },
  ],
};
