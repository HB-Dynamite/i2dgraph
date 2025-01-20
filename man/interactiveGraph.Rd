% Auto-generated: do not edit by hand
\name{interactiveGraph}

\alias{interactiveGraph}

\title{interactive_graph component}

\description{
This parent component measures its own container size then passes numeric width & height to the child graph.
}

\usage{
interactiveGraph(id=NULL, additionalData=NULL, additionalDataColor=NULL,
chartType=NULL, data=NULL, mainDataColor=NULL,
smoothingFactor=NULL, smoothingType=NULL, style=NULL,
xLabel=NULL, yLabel=NULL)
}

\arguments{
\item{id}{Character. }

\item{additionalData}{List of list of lists containing elements 'x', 'y'.
those elements have the following types:
  - x (character | numeric; optional)
  - y (numeric; optional)ss. }

\item{additionalDataColor}{List of characters. }

\item{chartType}{A value equal to: 'categorical', 'continuous'. }

\item{data}{List of lists containing elements 'x', 'y'.
those elements have the following types:
  - x (character | numeric; required)
  - y (numeric; required)s. }

\item{mainDataColor}{Character. }

\item{smoothingFactor}{Numeric. }

\item{smoothingType}{Character. }

\item{style}{Named list. }

\item{xLabel}{Character. }

\item{yLabel}{Character. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

