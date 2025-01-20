# AUTO GENERATED FILE - DO NOT EDIT

#' @export
interactiveGraph <- function(id=NULL, additionalData=NULL, additionalDataColor=NULL, chartType=NULL, data=NULL, mainDataColor=NULL, smoothingFactor=NULL, smoothingType=NULL, style=NULL, xLabel=NULL, yLabel=NULL) {
    
    props <- list(id=id, additionalData=additionalData, additionalDataColor=additionalDataColor, chartType=chartType, data=data, mainDataColor=mainDataColor, smoothingFactor=smoothingFactor, smoothingType=smoothingType, style=style, xLabel=xLabel, yLabel=yLabel)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'interactive_graph',
        namespace = 'i2dgraph',
        propNames = c('id', 'additionalData', 'additionalDataColor', 'chartType', 'data', 'mainDataColor', 'smoothingFactor', 'smoothingType', 'style', 'xLabel', 'yLabel'),
        package = 'i2dgraph'
        )

    structure(component, class = c('dash_component', 'list'))
}
