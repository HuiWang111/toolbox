import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  Teleport,
} from 'vue';

export default defineComponent({
  name: 'Portal',
  inheritAttrs: false,
  props: {
    getContainer: {
      type: Function,
      default: () => document.body
    }
  },
  setup(props, { slots }) {
    let container: HTMLElement;
    onBeforeMount(() => {
      container = props.getContainer();
    });
    onBeforeUnmount(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });
    return () => {
      return container ? <Teleport to={container} v-slots={slots} /> : null;
    };
  }
});
