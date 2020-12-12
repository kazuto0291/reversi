// モデルクラスにオセロのロジックを書く。
// オセロに必要なデータ構造を定義する
// コンポーネントは見た目だけ処理のロジックは書かない

export class Board {
　
  public rows: Row[];

  constructor() {
    this.rows = [...Array(8).keys()].map(i => new Row(i));
  }
}

export class Row {

  public cells: Cell[];

  constructor(rowNumber: number) {
    this.cells = [...Array(8).keys()].map(i => new Cell(i, rowNumber))
  }
}

export class Cell {

  public x: number;
  public y: number;
  // Cellの最初の状態を定義
  public state: CellState = CellState.None;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}

// enum--限られた有限個数（決まった値）の状態を持つ
export enum CellState {
  // オセロのマスは白石・黒石・なにもないの3つの状態しかないからenumで定義する。
  White = 'white',
  Black = 'black',
  None = 'none',
}