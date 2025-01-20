# %%
import dash
import math
from dash import html, dcc, Input, Output
from i2dgraph import interactive_graph

# Initialize the app
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

# App layout
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
                {"label": "Bellcurve", "value": "bellcurve"},
                {"label": "Linear", "value": "linear"},
                {"label": "Constant", "value": "constant"},
            ],
            value="bellcurve",  # Default smoothing type
            labelStyle={"display": "inline-block", "margin-right": "10px"},
        ),
        dcc.RadioItems(
            id="chart-type-radio",
            options=[
                {"label": "Categorical", "value": "categorical"},
                {"label": "Numerical", "value": "numerical"},
            ],
            value=None,  # Let the component infer by default
            labelStyle={"display": "inline-block", "margin-right": "10px"},
        ),
        html.Div(
            id="graph-div",
            children=[
                interactive_graph(
                    id="graph-switcher",
                    xLabel="Categories",
                    yLabel="Values",
                    data=random_points,
                    chartType=None,
                    smoothingType="bellcurve",
                    mainDataColor="blue",
                    additionalData=[random_points],
                    additionalDataColor=["red"],  # Pass a list of colors
                )
            ],
            style={"width": "600px", "height": "400px"},
        ),
    ]
)


@app.callback(
    [
        Output("graph-switcher", "data"),
        Output("graph-switcher", "chartType"),
    ],
    [Input("data-dropdown", "value"), Input("chart-type-radio", "value")],
)
def update_graph(selected_dataset, selected_chart_type):
    """
    Update the graph's dataset and chart type based on user selection.
    """
    data = data_options[selected_dataset]
    return data, selected_chart_type


@app.callback(
    Output("graph-switcher", "smoothingType"),
    [Input("smoothing-type-radio", "value")],
)
def update_smoothing_type(selected_smoothing_type):
    """
    Update the smoothing type for the graph.
    """
    return selected_smoothing_type


# Run the app
if __name__ == "__main__":
    app.run_server(debug=True)
# %%
