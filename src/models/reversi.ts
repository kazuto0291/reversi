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
    if (!this.ref(p).isNone) {return}

    const reversedList = this.search(p);
    // おける場所がないなら返す（置けない）
    if (reversedList.length === 0) {return}
    reversedList.forEach(p => this.ref(p).state = this.turn);

    this.ref(p).state = this.turn;


    console.log(this.search(p));

    this.next();


    if (this.shouldPass()) { this.next(); }

  }
// 現在のセルを返す
  public ref(p: Point): Cell {
    return this.rows[p.y].cells[p.x];
  }

  public next() {
    if (this.turn === CellState.Black) { return this.turn = CellState.White;}
    if (this.turn === CellState.White) { return this.turn = CellState.Black;}
  }

  // 再帰的に探索する。nextは次の探索座標を返す。
  public search(p : Point):Point[] {
    if (!this.ref(p).isNone) return [];
    const self = this;
    const _search = (_p: Point ,next: (pre: Point) => Point, list: Point[]): Point[] => {
      const _next = next(_p);
      if (!_next.inBoard || self.ref(_next).isNone) {
        return [];
      }
      if(self.ref(_next).state !==self.turn) {
        list.push(_next);
        return _search(_next, next, list);
      }
      return list;
    }
    let result: Point[] = [];
    result = result.concat(_search(p, p => new Point(p.x, p.y + 1), []));
    result = result.concat(_search(p, p => new Point(p.x, p.y - 1), []));
    result = result.concat(_search(p, p => new Point(p.x + 1, p.y), []));
    result = result.concat(_search(p, p => new Point(p.x - 1, p.y), []));
    result = result.concat(_search(p, p => new Point(p.x + 1, p.y + 1), []));
    result = result.concat(_search(p, p => new Point(p.x - 1, p.y + 1), []));
    result = result.concat(_search(p, p => new Point(p.x + 1, p.y - 1), []));
    result = result.concat(_search(p, p => new Point(p.x - 1, p.y - 1), []));
    return result;
  }

  public get blacks(): number {
    let count = 0;
    this.rows.forEach(r => {
      count += r.blacks;
    })
    return count;
  }

  public get whites(): number {
    let count = 0;
    this.rows.forEach(r => {
      count += r.whites;
    })
    return count;
  }

  // passすべきかどうか
  // 全マス探索する
  public shouldPass(): boolean {
    for (let i = 0; i < 8; i++) {
      for (let j =0; j < 8; j++) {
        const reversedList = this.search(new Point(i, j))
        if (reversedList.length > 0) {
          return false;
        }
      }
    }
    return true;
  }
}

export class Row {

  public cells: Cell[];
  public num: number;

  constructor(rowNumber: number) {
    this.num = rowNumber
    this.cells = [...Array(8).keys()].map(i => new Cell(i, rowNumber))
  }

  public get blacks(): number {
    let count= 0;
    this.cells.forEach(c => {
      if (c.isBlack) count++
    })
    return count;
  }

  public get whites(): number {
    let count =0;
    this.cells.forEach(c => {
      if(c.isWhite) count++
    })
    return count;
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

  public get inBoard() {
    return 0 <= this.x && this.x <= 7 && 0 <= this.y && this.y <= 7;
  }
}

// enum--限られた有限個数（決まった値）の状態を持つ
export enum CellState {
  // オセロのマスは白石・黒石・なにもないの3つの状態しかないからenumで定義する。
  White = 'white',
  Black = 'black',
  None = 'none',
}