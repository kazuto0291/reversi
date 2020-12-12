// モデルクラスにオセロのロジックを書く。
// オセロに必要なデータ構造を定義する
// コンポーネントは見た目だけ処理のロジックは書かない

export class Board {
　
  public rows: Row[];
  public turn:CellState = CellState.Black;

  constructor() {
    this.rows = [...Array(8).keys()].map(i => new Row(i));
    // オセロの初期状態を取得する
    this.rows[3].cells[3].state = CellState.White;
    this.rows[4].cells[4].state = CellState.White;
    this.rows[3].cells[4].state = CellState.Black;
    this.rows[4].cells[3].state = CellState.Black;
  }

  public put(p: Point) {
    //すでに石があるところには石を置かない。
    if (!this.rows[p.y].cells[p.x].isNone) {return}
    this.rows[p.y].cells[p.x].state = this.turn;

    if (this.turn === CellState.Black) { return this.turn = CellState.White;}
    if (this.turn === CellState.White) { return this.turn = CellState.Black;}
  }

  public search(p : Point):Point[] {
    return [];
  }
}

export class Row {

  public cells: Cell[];
  public num: number;

  constructor(rowNumber: number) {
    this.num = rowNumber
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

  public get isBlack(): boolean {
    return this.state === CellState.Black;
  }

  public get isWhite(): boolean {
    return this.state === CellState.White;
  }

  public get isNone(): boolean {
    return this.state === CellState.None;
  }
}

// ある座標x, yに石を置くときにそこに石をおいたらひっくり返る座標全体のリストが取得できるようにPointクラスを作る
export class Point {
  public x: number;
  public y: number;

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