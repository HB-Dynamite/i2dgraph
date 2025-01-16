# AUTO GENERATED FILE - DO NOT EDIT

#' @export
interactiveGraph <- function(id=NULL, chartType=NULL, data=NULL, smoothingFactor=NULL, smoothingType=NULL, style=NULL, xLabel=NULL, yLabel=NULL) {
    
    props <- list(id=id, chartType=chartType, data=data, smoothingFactor=smoothingFactor, smoothingType=smoothingType, style=style, xLabel=xLabel, yLabel=yLabel)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'interactive_graph',
        namespace = 'i2dgraph',
        propNames = c('id', 'chartType', 'data', 'smoothingFactor', 'smoothingType', 'style', 'xLabel', 'yLabel'),
        package = 'i2dgraph'
        )

    structure(component, class = c('dash_component', 'list'))
}
