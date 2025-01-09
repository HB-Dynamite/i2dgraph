# %%import dash
import dash
import math
from dash import html, dcc, Input, Output, State
import random

# Import the new InteractiveGraphSwitcher component
from i2dgraph import interactive_graph

app = dash.Dash(__name__)

# Sample datasets
data_set_cats = [
    {"x": "cat", "y": 50},
    {"x": "dog", "y": 100},
    {"x": "human", "y": 150},
    {"x": "whale", "y": 200},
    {"x": "bear", "y": 250},
    {"x": "chimp", "y": 300},
    {"x": "Tiger", "y": -100},
]

data_set_nums = [
    {"x": 10, "y": 10},
    {"x": 20, "y": 20},
    {"x": 30, "y": 15},
    {"x": 40, "y": 25},
    {"x": 50, "y": 30},
]

data_set_mix = [
    {"x": "A", "y": 5},
    {"x": "B", "y": 10},
    {"x": "C", "y": -5},
    {"x": 1, "y": 50},
    {"x": 2, "y": 0},
    {"x": 3, "y": 20},
]

random_points = [{"x": i, "y": math.sin(i / 10)} for i in range(0, 100, 1)]


data_options = {
    "Categorical": data_set_cats,
    "Continuous": data_set_nums,
    "Mixed": data_set_mix,
    "Random": random_points,
}

app.layout = html.Div(
    [
        html.H1("Interactive Graph Switcher Test"),
        dcc.Dropdown(
            id="data-dropdown",
            options=[{"label": k, "value": k} for k in data_options.keys()],
            value="Categorical",
        ),
        html.Label("Chart Type (optional):"),
        dcc.RadioItems(
            id="smoothing-type-radio",
            options=[
                {"label": "bellcurve", "value": "bellcurve"},
                {"label": "linear", "value": "linear"},
                {"label": "constant", "value": "constant"},
            ],
            value=None,  # Let the component infer by default
            labelStyle={"display": "inline-block", "margin-right": "10px"},
        ),
        dcc.RadioItems(
            id="chart-type-radio",
            options=[
                {"label": "Cat", "value": "categorical"},
                {"label": "num", "value": "numerical"},
            ],
            value=None,  # Let the component infer by default
            labelStyle={"display": "inline-block", "margin-right": "10px"},
        ),
        html.Button("Print Data", id="print-button"),
        html.Div(id="data-output"),
        interactive_graph(
            id="graph-switcher",
            width=900,
            height=700,
            xLabel="Categories",
            yLabel="Values",
            data=data_set_cats,
            chartType=None,
            smoothingType="bellcurve",
            # Let the component infer by default
            # Example of passing additional props:
            # colorScheme="viridis",
            # animationDuration=500,
        ),
    ]
)


@app.callback(
    [Output("graph-switcher", "data"), Output("graph-switcher", "chartType")],
    [Input("data-dropdown", "value"), Input("chart-type-radio", "value")],
)
def update_graph(value, chart_type):
    data = data_options[value]
    # If chart_type is None, the component will infer
    return data, chart_type


@app.callback(
    Output("data-output", "children"),
    [Input("print-button", "n_clicks")],
    [State("graph-switcher", "data")],
)
def print_data(n_clicks, current_data):
    if n_clicks:
        return f"Current Data: {current_data}"
    return ""


@app.callback(
    Output("graph-switcher", "smoothingType"), [Input("smoothing-type-radio", "value")]
)
def update_smoothing_type(value):
    return value


if __name__ == "__main__":
    app.run_server(debug=True)

# %%
