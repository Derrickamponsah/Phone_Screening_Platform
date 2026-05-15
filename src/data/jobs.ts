import { Job } from '@/types';

export const SEED_JOBS: Job[] = [
  {
    id: 'job-001',
    title: 'Frontend-Focused Full Stack Developer',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    description: `We're looking for a talented Full Stack Developer to join our growing team. You'll work on modern web applications using React, Node.js, and PostgreSQL. Strong frontend skills are essential, with experience in responsive design and modern CSS frameworks.

Key Responsibilities:
- Build responsive web applications with React and modern JavaScript
- Develop backend APIs and services using Node.js
- Collaborate with designers and product managers
- Write clean, maintainable, and well-tested code
- Participate in code reviews and architectural discussions

Required Skills:
- 3+ years of experience with React
- Proficiency in JavaScript/TypeScript
- Experience with HTML5 and CSS3
- Understanding of REST APIs and databases
- Git and version control expertise

Nice to Have:
- Next.js experience
- Knowledge of Tailwind CSS or similar frameworks
- Experience with testing frameworks
- Understanding of web performance optimization`,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'job-002',
    title: 'Product Designer Intern',
    location: 'New York, NY',
    employmentType: 'Internship',
    description: `Join our design team as an intern and work on real products used by thousands. You'll collaborate with engineers and product managers to design intuitive user interfaces. Experience with Figma and UI design principles is a plus.

Key Responsibilities:
- Create wireframes and high-fidelity mockups
- Conduct user research and usability testing
- Design responsive interfaces for web and mobile
- Contribute to design systems and component libraries
- Work closely with engineering teams

Required Skills:
- Proficiency in design tools (Figma, Adobe XD, or similar)
- Understanding of UI/UX principles
- Basic knowledge of web technologies
- Strong communication and collaboration skills
- Portfolio demonstrating design work

Nice to Have:
- Experience with prototyping tools
- Knowledge of accessibility standards
- Understanding of design systems
- Experience with user research methodologies`,
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: 'job-003',
    title: 'Backend Engineer',
    location: 'Austin, TX',
    employmentType: 'Full-time',
    description: `We need an experienced Backend Engineer to build scalable APIs and microservices. Proficiency in Node.js, Python, or Go is required. Experience with databases, caching, and cloud infrastructure is essential.

Key Responsibilities:
- Design and implement RESTful and GraphQL APIs
- Build microservices architecture using Node.js or Python
- Optimize database queries and implement caching strategies
- Implement security best practices and authentication
- Monitor and optimize system performance

Required Skills:
- 4+ years of backend development experience
- Proficiency in Node.js, Python, or Go
- Strong database knowledge (SQL and NoSQL)
- Understanding of API design and REST principles
- Experience with cloud platforms (AWS, GCP, or Azure)

Nice to Have:
- Experience with Kubernetes and Docker
- Knowledge of message queues (RabbitMQ, Kafka)
- Experience with GraphQL
- Familiarity with CI/CD pipelines`,
    createdAt: new Date('2024-01-05').toISOString(),
  },
  {
    id: 'job-004',
    title: 'DevOps Engineer',
    location: 'Seattle, WA',
    employmentType: 'Full-time',
    description: `We're seeking a DevOps Engineer to manage our infrastructure and deployment pipelines. You'll work with modern cloud technologies and containerization to ensure reliable, scalable systems.

Key Responsibilities:
- Manage and optimize cloud infrastructure
- Design CI/CD pipelines and deployment strategies
- Monitor system performance and reliability
- Implement infrastructure as code practices
- Ensure security and compliance

Required Skills:
- 3+ years of DevOps experience
- Strong knowledge of AWS or GCP
- Experience with Docker and Kubernetes
- Proficiency in bash scripting and programming
- Understanding of networking and security

Nice to Have:
- Experience with Terraform or CloudFormation
- Knowledge of monitoring tools like Prometheus
- Understanding of database administration
- Experience with incident response`,
    createdAt: new Date('2024-01-08').toISOString(),
  },
];
