# AUTO GENERATED FILE - DO NOT EDIT

export interactive_bar_chart

"""
    interactive_bar_chart(;kwargs...)

An interactive_bar_chart component.

Keyword arguments:
- `id` (String; required)
- `data` (optional): . data has the following type: Array of lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (String | Real; required)
  - `y` (Real; required)s
- `height` (Real; optional)
- `width` (Real; optional)
- `xLabel` (String; optional)
- `yLabel` (String; optional)
"""
function interactive_bar_chart(; kwargs...)
        available_props = Symbol[:id, :data, :height, :width, :xLabel, :yLabel]
        wild_props = Symbol[]
        return Component("interactive_bar_chart", "interactive_bar_chart", "i2dgraph", available_props, wild_props; kwargs...)
end

