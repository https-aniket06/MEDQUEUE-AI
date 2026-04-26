# AI Health and Education Platform

A comprehensive platform combining healthcare queue management, education matching, and AI-powered symptom checking.

## Project Overview

This is a full-stack application featuring:
- **MedQueue**: Hospital queue management system
- **EduMatch**: Educational services matching
- **Symptom Checker**: AI-powered medical symptom analysis chatbot
- **Hospital Finder**: Healthcare facility locator with filtering

## Project Structure

```
├── backend/                 # Node.js/Express backend server
│   ├── ai_engine/          # AI service integration
│   └── src/                # Backend source code
├── src/                    # Frontend React/TypeScript code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── contexts/           # Context API providers
│   └── i18n/               # Internationalization
├── ml-service/             # Python ML service for predictions
├── symptom/                # openai chatbot for symptom checking
├── testsprite_tests/       # Automated test cases
└── medqueue-edumatch/      # Legacy integration modules
```

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: Firebase/Firestore
- **ML/AI**: Python, PyTorch, NLP
- **Testing**: Selenium-based test automation
- **Deployment**: Render.com

## Features

✅ Patient queue management with real-time status updates  
✅ Admin dashboard for queue operations  
✅ AI chatbot for symptom checking and medical guidance  
✅ Hospital finder with location-based filtering  
✅ Educational services matching  
✅ Multi-language support  
✅ Responsive design for all devices  

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- Firebase project setup

### Installation

1. Clone the repository
```bash
git clone https://github.com/bipinmallick252525-dot/Ai-Health-and-Ed-.git
cd Ai-Health-and-Ed-
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Install ML service dependencies
```bash
cd ../ml-service
pip install -r requirements.txt
```

### Running the Application

**Frontend** (Vite dev server):
```bash
npm run dev
```

**Backend** (Node.js):
```bash
cd backend
npm start
```

**ML Service** (Python):
```bash
cd ml-service
python main.py
```

## Configuration

Update the following configuration files:
- `firebase.json` - Firebase project settings
- `.env` - Environment variables
- `vite.config.ts` - Frontend build configuration
- `backend/tsconfig.json` - Backend TypeScript settings

## Testing

Run automated tests using:
```bash
cd testsprite_tests
# Run individual test cases
python TC001_Landing_Page___Navigation_Header_Links.py
```

## Deployment

The application is configured for deployment on Render.com. See `render.yaml` for deployment settings.

## Contributors

- **GitHub Account**: bipinmallick252525-dot

## License

See LICENSE file in the symptom checker module for details.

## Support

For issues or questions, please create an issue in the GitHub repository.

---

**Last Updated**: March 2026  
**Repository**: https://github.com/bipinmallick252525-dot/Ai-Health-and-Ed-
