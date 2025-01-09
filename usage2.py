# %%
import dash
from dash import html, dcc, Input, Output, State
import random

import i2dgraph as dig  # Replace with the name of your React component library
from i2dgraph import interactive_bar_chart
from i2dgraph import interactive_2d_graph

print(interactive_2d_graph)
print(interactive_bar_chart)
print(dig)
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
]

data_set_mix = [
    {"x": "A", "y": 5},
    {"x": "B", "y": 10},
    {"x": "C", "y": -5},
    {"x": 1, "y": 50},
    {"x": 2, "y": 0},
    {"x": 3, "y": 20},
]

data_options = {
    "Categories": data_set_cats,
    "Numbers": data_set_nums,
    "Mixed": data_set_mix,
}

app.layout = html.Div(
    [
        html.H1("Interactive 2D Bar Chart"),
        dcc.Dropdown(
            id="data-dropdown",
            options=[{"label": k, "value": k} for k in data_options.keys()],
            value="Categories",
        ),
        html.Button("Print Data", id="print-button"),
        html.Div(id="data-output"),
        dig.interactive_bar_chart(
            id="bar-chart",
            width=600,
            height=400,
            xLabel="X Axis",
            yLabel="Y Axis",
            data=data_set_cats,
        ),
    ]
)


@app.callback(Output("bar-chart", "data"), Input("data-dropdown", "value"))
def update_data(value):
    return data_options[value]


@app.callback(
    Output("data-output", "children"),
    Input("print-button", "n_clicks"),
    State("bar-chart", "data"),
)
def print_data(n_clicks, current_data):
    if n_clicks:
        return f"Current Data: {current_data}"
    return ""


if __name__ == "__main__":
    app.run_server(debug=True)

# %%
