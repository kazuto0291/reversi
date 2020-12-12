<template>
  <div class="cell-wrapper"
    @click = "onClick"
  >
    <div class="cell"></div>
    <div class="stone" :class="stoneClass"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit} from 'vue-property-decorator';

import { Cell } from '../../models/reversi';

@Component
export default class VCell extends Vue {

  @Prop({required: true})
  // 必須のPropを定義する
  // !(ビックリマークはnull許可・undifindを許可する型)
  public cell!: Cell;

  public created() {
    // console.log(this.cell.x, this.cell.y);
  }

  @Emit('put')
  public put(x: number, y: number) {}

  public onClick() {
    this.put(this.cell.x, this.cell.y);
  }

  public get stoneClass() {
    return {
      'white-stone': this.cell.isWhite,
      'black-stone': this.cell.isBlack,
    }
  }
}
</script>


<style scoped>
.cell-wrapper {
  position: relative;
}

.cell {
  height :64px;
  width :64px;
  background-color: darkgreen;
  border: 2px solid black;
}

.stone {
  position: absolute;
  top: 2px;
  left: 2px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.white-stone {
  background-color: white
}

.black-stone {
  background-color: black;
}
</style>