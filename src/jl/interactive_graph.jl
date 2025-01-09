# AUTO GENERATED FILE - DO NOT EDIT

export interactive_graph

"""
    interactive_graph(;kwargs...)

An interactive_graph component.

Keyword arguments:
- `id` (String; required)
- `chartType` (a value equal to: 'categorical', 'continuous'; optional)
- `data` (required): . data has the following type: Array of lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (String | Real; required)
  - `y` (Real; required)s
- `height` (Real; optional)
- `smoothingFactor` (Real; optional)
- `smoothingType` (String; optional)
- `width` (Real; optional)
- `xLabel` (String; optional)
- `yLabel` (String; optional)
"""
function interactive_graph(; kwargs...)
        available_props = Symbol[:id, :chartType, :data, :height, :smoothingFactor, :smoothingType, :width, :xLabel, :yLabel]
        wild_props = Symbol[]
        return Component("interactive_graph", "interactive_graph", "i2dgraph", available_props, wild_props; kwargs...)
end

