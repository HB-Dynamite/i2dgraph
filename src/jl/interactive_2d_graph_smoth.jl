# AUTO GENERATED FILE - DO NOT EDIT

export interactive_2d_graph_smoth

"""
    interactive_2d_graph_smoth(;kwargs...)

An interactive_2d_graph_smoth component.

Keyword arguments:
- `id` (String; required)
- `height` (Real; optional)
- `points` (optional): . points has the following type: Array of lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (Real; required)
  - `y` (Real; required)s
- `width` (Real; optional)
- `xLabel` (String; optional)
- `yLabel` (String; optional)
"""
function interactive_2d_graph_smoth(; kwargs...)
        available_props = Symbol[:id, :height, :points, :width, :xLabel, :yLabel]
        wild_props = Symbol[]
        return Component("interactive_2d_graph_smoth", "interactive_2d_graph_smoth", "i2dgraph", available_props, wild_props; kwargs...)
end

