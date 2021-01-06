import type { ColumnProps } from "ant-design-vue/lib/table/interface";
import type { PropType } from "vue";




export const tableProps = {
  columns: {
    type: [Array] as PropType<ColumnProps[]>,
    default: null,
  },
  dataSource: {
    type: Array as PropType<unknown[]>,
    default: [],
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record: unknown) => string)>,
    default: "id",
  },
  total: {
    type: Number,
    default: undefined
  },
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: {},
  },
  rowSelection: {
    type: Object,
    default: undefined,
  }
}

export const tableListProps = {
  ...tableProps,

  title: {
    type: String,
    default: ""
  }
}


export interface TableColumn extends ColumnProps {
  dataIndex: string

  slots?: Indexable;
}


export interface Options {
  label: string;
  value: string;
}

export interface State {
  indeterminate: boolean;
  checkAll: boolean;
  checkedList: string[];
  defaultCheckList: string[];
}
