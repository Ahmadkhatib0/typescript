import { MatchData } from './MatchData'

export interface Analyzer {
  run(matches: MatchData[]): string
}

export interface OutputTarget {
  print(report: string): void
}

export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: MatchData[]): void {
    // the advantage here from this method, is that we can to easily swap out this e.g run or print and
    // replace them with other impelementations without affecting this buildAndPrintReport
    const output = this.analyzer.run(matches)
    this.outputTarget.print(output)
  }
}
