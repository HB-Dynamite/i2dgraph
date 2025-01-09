# AUTO GENERATED FILE - DO NOT EDIT

#' @export
interactiveBarChart <- function(id=NULL, data=NULL, height=NULL, width=NULL, xLabel=NULL, yLabel=NULL) {
    
    props <- list(id=id, data=data, height=height, width=width, xLabel=xLabel, yLabel=yLabel)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'interactive_bar_chart',
        namespace = 'i2dgraph',
        propNames = c('id', 'data', 'height', 'width', 'xLabel', 'yLabel'),
        package = 'i2dgraph'
        )

    structure(component, class = c('dash_component', 'list'))
}
