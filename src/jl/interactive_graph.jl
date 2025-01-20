# AUTO GENERATED FILE - DO NOT EDIT

export interactive_graph

"""
    interactive_graph(;kwargs...)

An interactive_graph component.
This parent component measures its own container size
then passes numeric width & height to the child graph.
Keyword arguments:
- `id` (String; required)
- `additionalData` (optional): . additionalData has the following type: Array of Array of lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (String | Real; optional)
  - `y` (Real; optional)ss
- `additionalDataColor` (Array of Strings; optional)
- `chartType` (a value equal to: 'categorical', 'continuous'; optional)
- `data` (optional): . data has the following type: Array of lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (String | Real; required)
  - `y` (Real; required)s
- `mainDataColor` (String; optional)
- `smoothingFactor` (Real; optional)
- `smoothingType` (String; optional)
- `style` (Dict; optional)
- `xLabel` (String; optional)
- `yLabel` (String; optional)
"""
function interactive_graph(; kwargs...)
        available_props = Symbol[:id, :additionalData, :additionalDataColor, :chartType, :data, :mainDataColor, :smoothingFactor, :smoothingType, :style, :xLabel, :yLabel]
        wild_props = Symbol[]
        return Component("interactive_graph", "interactive_graph", "i2dgraph", available_props, wild_props; kwargs...)
end

