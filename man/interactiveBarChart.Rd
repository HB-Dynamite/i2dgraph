% Auto-generated: do not edit by hand
\name{interactiveBarChart}

\alias{interactiveBarChart}

\title{interactive_bar_chart component}

\description{

}

\usage{
interactiveBarChart(id=NULL, additionalData=NULL, additionalDataColor=NULL,
data=NULL, height=NULL, mainDataColor=NULL, width=NULL,
xLabel=NULL, yLabel=NULL)
}

\arguments{
\item{id}{Character. }

\item{additionalData}{List of list of lists containing elements 'x', 'y'.
those elements have the following types:
  - x (character | numeric; optional)
  - y (numeric; optional)ss. }

\item{additionalDataColor}{List of characters. }

\item{data}{List of lists containing elements 'x', 'y'.
those elements have the following types:
  - x (character | numeric; required)
  - y (numeric; required)s. }

\item{height}{Numeric. }

\item{mainDataColor}{Character. }

\item{width}{Numeric. }

\item{xLabel}{Character. }

\item{yLabel}{Character. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

