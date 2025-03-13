# Full Stack Olympic Medal Predictor

Welcome to the **Full Stack Olympic Medal Predictor**! 🏅
This is a full-stack web application that predicts the number of medals a country might win in the Olympics. The prediction model is built using machine learning, and the application is powered by the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features
- **Machine Learning Model**: The prediction model is based on a trained dataset using the `LinearRegression` algorithm from `scikit-learn`.
- **Next.js for Frontend**: A sleek and modern UI built using Next.js with Material-UI components.
- **Express.js & MongoDB Backend**: A powerful backend to handle API requests and store data.
- **Blockchain Integration**: Future updates will include smart contract-based data integrity and royalty splits using Solidity and Web3.js.
- **Geofencing & Mapping (Upcoming)**: Integration of mapping technology for data visualization and insights.
- **Stock Chart for Analytics**: Displays historical and predicted performance with interactive charts.
- **Olympic Data Analysis**: Uses real-world Olympic data for predictive analytics.
- **AI-Powered Prediction Model**: Uses a trained machine learning model for medal predictions based on athlete count and country data.

---

## Features
- 📊 Predict the number of medals a country might win based on previous Olympic data.
- **Interactive UI**: Built with Material-UI for a sleek, responsive experience.
- **Database Integration**: Uses MongoDB to store and manage team and prediction data.
- **Backend API**: Built with Express.js to handle requests and serve predictions.
- **Blockchain Integration (Upcoming)**: Planning to integrate blockchain technology for secure data handling and reward mechanisms.

## Technologies Used
- **Frontend**: Next.js, Material-UI
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Machine Learning**: Python, Scikit-Learn
- **Blockchain**: Web3.js, Solidity, Avalanche (Upcoming feature)

## Features
- Fetch available Olympic countries from a database.
- Predict medals based on historical athlete data and machine learning models.
- Display actual vs. predicted medal counts along with error margin.
- Interactive UI with country selection and real-time results.

## How It Works
1. The frontend (Next.js + Material-UI) allows users to select a **team name**.
2. The **Express.js API** receives the selected team name and converts it into the corresponding country name using `teams.csv`.
3. The **Python Machine Learning Model (run_model.py)** predicts the number of medals based on historical athlete data for the corresponding country.
4. The backend (Express.js) handles API requests and interacts with the **scikit-learn** model in the `app/api/predict/[country]` route.
5. The **MERN stack** is used to store and manage past predictions.
6. A **graph visualization** shows past predictions and actual outcomes, along with the mean error of the model.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/SouvickSarkar20/Full-stack-.git
   cd Full-stack-Olympic-Medal-Predictor
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm run dev
   ```
4. Access the frontend at:
   ```sh
   http://localhost:3000
   ```
5. Backend API can be accessed at:
   ```sh
   http://localhost:3000/api/predict/[country]
   ```
   
## Upcoming Features
- **Auto country mapping**: The model will automatically map team names to their corresponding country names before processing predictions.
- **More AI Enhancements**: Integrating advanced ML techniques for better accuracy.
- **Historical Data Visualization**: Display past performances in Olympic history.
- **Decentralized Data Storage** (Blockchain): Ensuring security and transparency in medal prediction data.

## Contribution & Feedback
Contributions and feedback are welcome! If you find any bugs, have feature suggestions, or want to collaborate, feel free to open an issue or submit a pull request.

Happy Coding! 🚀
