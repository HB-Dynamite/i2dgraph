# AUTO GENERATED FILE - DO NOT EDIT

#' @export
interactive2dGraphSmooth <- function(id=NULL, data=NULL, height=NULL, smoothingFactor=NULL, smoothingType=NULL, width=NULL, xLabel=NULL, yLabel=NULL) {
    
    props <- list(id=id, data=data, height=height, smoothingFactor=smoothingFactor, smoothingType=smoothingType, width=width, xLabel=xLabel, yLabel=yLabel)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'interactive_2d_graph_smooth',
        namespace = 'i2dgraph',
        propNames = c('id', 'data', 'height', 'smoothingFactor', 'smoothingType', 'width', 'xLabel', 'yLabel'),
        package = 'i2dgraph'
        )

    structure(component, class = c('dash_component', 'list'))
}
