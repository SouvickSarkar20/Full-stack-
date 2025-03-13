import sys
import pandas as pd
import pickle
import json
import os

try:
    # Load trained model
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "model.pkl")
    with open(model_path, "rb") as f:
        model = pickle.load(f)

    # Load CSV data
    csv_path = os.path.join(base_dir, "teams.csv")
    df = pd.read_csv(csv_path)

    # Normalize CSV columns (strip spaces, convert to lowercase)
    df["team"] = df["team"].astype(str).str.strip().str.lower()  # Assume 'team' column has codes like 'IND'
    df["country"] = df["country"].astype(str).str.strip().str.lower()  # Full country name

    # Get team name from input
    team_name = sys.argv[1].strip().lower()
    print("Received team name:", team_name, file=sys.stderr)

    # Find the corresponding country
    country_row = df[df["team"] == team_name]

    if country_row.empty:
        print(json.dumps({"error": "Team not found"}))
        sys.exit(0)

    country_name = country_row["country"].values[0]
    print("Mapped to country:", country_name, file=sys.stderr)

    # Find the row for the country
    country_row = df[df["country"] == country_name]

    if country_row.empty:
        print(json.dumps({"error": "Country not found"}))
        sys.exit(0)

    # Extract features
    athlete_count = int(country_row["athletes"].values[0])
    prev_medals = int(country_row["prev_medals"].values[0])

    # Predict
    predicted = model.predict([[athlete_count, prev_medals]])[0]
    error = abs(prev_medals - predicted)

    # Return JSON output
    result = {
        "actual_medals": prev_medals,
        "predicted_medals": float(predicted),
        "error": float(error)
    }
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
