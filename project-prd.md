Product Requirements Document (PRD)
Title: Neurodivergent Recruitment Platform
Context
The recruitment company aims to support neurodivergent candidates (e.g., those with bipolar disorder, ADHD, PTSD) by showcasing their strengths as "superheroes" in the workforce. The platform will help large organizations identify suitable candidates, integrating with their existing ATS/HR tools.
Objectives
- Create a user-friendly platform that allows neurodivergent candidates to sign up and be included in a searchable database.
- Enable organizations to easily filter and find candidates based on specific criteria related to neurodivergence.
- Ensure data security and privacy for all users.
Use Case
The platform will allow organizations to:
1. Identify and select neurodivergent candidates based on their strengths and vulnerabilities.
2. Manually transfer selected candidates to their current ATS/HR systems.
Key Features
1. Candidate Database
- Data Fields:
  - Dropdown: Diagnosis 1 (options: Bipolar, ADHD, PTSD)
  - Scale (1-5): Symptom severity
  - Scale (1-5): Symptom fluctuation (long-term)
  - Scale (1-5): Symptom fluctuation (short-term)
  - Checkboxes: Superpowers (based on diagnosis)
    - Predefined examples (e.g., Thinking outside the box, Energetic, Periods of high production) with an option to "Add your own."
  - Checkboxes: Vulnerabilities (based on diagnosis)
    - Predefined examples (e.g., Mood swings, Bad temper, Periods of low production) with an option to "Add your own."
  - Optional Dropdown: Diagnosis 2 (same options as Diagnosis 1)
  - Contact Info:
    - Mandatory email
    - Optional phone number
2. User-Facing Widget/Signup
A simple form accessible via a link for candidates to enter their information.
Mobile-responsive design for easy access.
3. Admin Features
- Searchable Database:
  - Ability to filter candidates based on all data fields (e.g., diagnosis, severity, superpowers, vulnerabilities).
  - Anonymization Options: Ability to hide sensitive details (name, age, gender) when viewing or exporting data.
4. Security & Privacy
Utilize Firebase for data storage with encryption and strong security measures.
Ensure compliance with data protection regulations regarding sensitive information.
Tech Stack
- Frontend: React.js for building the user interface.
- Backend: Node.js for handling API requests.
- Database: Firebase for storing candidate data securely.
- Hosting: Vercel for deploying the application and ensuring fast, reliable performance.
Success Metrics
- Number of candidates successfully registered.
- Feedback from organizations using the database.
- Engagement rate of candidates signing up.