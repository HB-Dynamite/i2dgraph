# %%mport dash
import dash
from dash import html, dcc, Input, Output, State

import random
import math

import i2dgraph as dig  # Replace with the name of your React component library

app = dash.Dash(__name__)

# Initial sets of points
points_set_1 = [
    {"x": 10, "y": 10},
    {"x": 20, "y": 20},
    {"x": 30, "y": 15},
]

points_set_2 = [
    {"x": 50, "y": 50},
    {"x": 60, "y": 40},
    {"x": 70, "y": 70},
    {"x": 80, "y": 20},
    {"x": 90, "y": 90},
    {"x": 100, "y": 10},
    {"x": 110, "y": 50},
    {"x": 140, "y": 80},
    {"x": 150, "y": 30},
    {"x": 190, "y": 60},
]

points_set_3 = [
    {"x": 10, "y": 10},
    {"x": 20, "y": 10},
    {"x": 30, "y": 10},
    {"x": 50, "y": 10},
    {"x": 60, "y": 10},
    {"x": 70, "y": 10},
    {"x": 80, "y": 10},
    {"x": 90, "y": 10},
    {"x": 100, "y": 10},
    {"x": 110, "y": 10},
    {"x": 140, "y": 10},
    {"x": 150, "y": 10},
    {"x": 190, "y": 10},
]

random_points = [{"x": i, "y": math.sin(i / 10)} for i in range(0, 100, 1)]

point_options = {
    "minimal": points_set_1,
    "extended": points_set_2,
    "Line": points_set_3,
    "Sinus": random_points,
}


app.layout = html.Div(
    [
        html.H1("Interactive 2D Graph"),
        dcc.Dropdown(
            id="points-dropdown",
            options=[{"label": key, "value": key} for key in point_options.keys()],
            value="minimal",
        ),
        # Here we add a slider instead of a dropdown for smoothingFactor
        html.Label("Smoothing Factor"),
        dcc.Slider(
            id="smoothing-slider",
            min=0.0,
            max=1.0,
            step=0.05,
            value=0.1,
            marks={i / 10: f"{i/10}" for i in range(1, 11)},  # marks at 0.1 intervals
        ),
        dig.interactive_2d_graph_smooth(
            # dig.interactive_bar_chart(
            id="graph",
            width=900,
            height=500,
            xLabel="X Axis",
            yLabel="Y Axis",
            # data=point_options["minimal"],
            data=points_set_1,
            smoothingFactor=0.1,
        ),
        html.Button("print points", id="print-button"),
        html.Div(id="points-Display"),
    ]
)


@app.callback(Output("graph", "data"), Input("points-dropdown", "value"))
def update_data(value):
    return point_options[value]


@app.callback(Output("graph", "smoothingFactor"), Input("smoothing-slider", "value"))
def update_smoothing(value):
    return value


@app.callback(
    Output("points-Display", "children"),
    Input("print-button", "n_clicks"),
    State("graph", "data"),
)
def print_points(n_clicks, points):
    return f"Points: {points}"


if __name__ == "__main__":
    app.run_server(debug=True)
# %%
