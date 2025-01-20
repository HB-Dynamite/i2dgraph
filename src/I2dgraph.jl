
module I2dgraph
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.3"

include("jl/interactive_2d_graph_smooth.jl")
include("jl/interactive_bar_chart.jl")
include("jl/interactive_graph.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "i2dgraph",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "async-interactive_2d_graph.js",
    external_url = "https://unpkg.com/i2dgraph@0.0.3/i2dgraph/async-interactive_2d_graph.js",
    dynamic = nothing,
    async = :true,
    type = :js
),
DashBase.Resource(
    relative_package_path = "async-interactive_2d_graph.js.map",
    external_url = "https://unpkg.com/i2dgraph@0.0.3/i2dgraph/async-interactive_2d_graph.js.map",
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "i2dgraph.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "i2dgraph.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
