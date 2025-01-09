# AUTO GENERATED FILE - DO NOT EDIT

export interactive_2d_graph_smooth

"""
    interactive_2d_graph_smooth(;kwargs...)

An interactive_2d_graph_smooth component.

Keyword arguments:
- `id` (String; required)
- `data` (optional): . data has the following type: Array of lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (Real; required)
  - `y` (Real; required)s
- `height` (Real; optional)
- `smoothingFactor` (Real; optional)
- `smoothingType` (String; optional)
- `width` (Real; optional)
- `xLabel` (String; optional)
- `yLabel` (String; optional)
"""
function interactive_2d_graph_smooth(; kwargs...)
        available_props = Symbol[:id, :data, :height, :smoothingFactor, :smoothingType, :width, :xLabel, :yLabel]
        wild_props = Symbol[]
        return Component("interactive_2d_graph_smooth", "interactive_2d_graph_smooth", "i2dgraph", available_props, wild_props; kwargs...)
end

