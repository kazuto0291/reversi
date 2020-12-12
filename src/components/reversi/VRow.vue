<template>
  <v-layout>
    <VCell
      v-for="(cell) in row.cells"
      :key ="`${cell.x}-${cell.y}`"
      :cell="cell"
      @put="onPutEvent"
    />
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit} from 'vue-property-decorator';
import VCell from '@/components/reversi/VCell.vue';

import { Row } from '../../models/reversi';

@Component({
  components: {
    VCell,
  },
})
export default class VRow extends Vue {

  @Prop({required: true})
  public row!: Row;

  @Emit('put')
  public put(x: number, y: number) {}

  public onPutEvent(x: number, y: number) {
    this.put(x, y)
  }
}
</script>