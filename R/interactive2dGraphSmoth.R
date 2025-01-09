# AUTO GENERATED FILE - DO NOT EDIT

#' @export
interactive2dGraphSmoth <- function(id=NULL, height=NULL, points=NULL, width=NULL, xLabel=NULL, yLabel=NULL) {
    
    props <- list(id=id, height=height, points=points, width=width, xLabel=xLabel, yLabel=yLabel)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'interactive_2d_graph_smoth',
        namespace = 'i2dgraph',
        propNames = c('id', 'height', 'points', 'width', 'xLabel', 'yLabel'),
        package = 'i2dgraph'
        )

    structure(component, class = c('dash_component', 'list'))
}
