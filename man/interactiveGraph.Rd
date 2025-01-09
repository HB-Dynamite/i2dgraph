% Auto-generated: do not edit by hand
\name{interactiveGraph}

\alias{interactiveGraph}

\title{interactive_graph component}

\description{

}

\usage{
interactiveGraph(id=NULL, chartType=NULL, data=NULL, height=NULL,
smoothingFactor=NULL, smoothingType=NULL, width=NULL,
xLabel=NULL, yLabel=NULL)
}

\arguments{
\item{id}{Character. }

\item{chartType}{A value equal to: 'categorical', 'continuous'. }

\item{data}{List of lists containing elements 'x', 'y'.
those elements have the following types:
  - x (character | numeric; required)
  - y (numeric; required)s. }

\item{height}{Numeric. }

\item{smoothingFactor}{Numeric. }

\item{smoothingType}{Character. }

\item{width}{Numeric. }

\item{xLabel}{Character. }

\item{yLabel}{Character. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

