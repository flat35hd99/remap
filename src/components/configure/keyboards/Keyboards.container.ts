import { connect } from 'react-redux';
import Keyboards from './Keyboards';
import { RootState } from '../../../store/state';
import { KeyboardsActions } from '../../../actions/actions';

const mapStateToProps = (state: RootState) => {
  const layerCount = state.entities.device.layerCount;
  return {
    layers: [...Array(layerCount)].map((_, i) => i),
    selectedLayer: state.keyboards.selectedLayer,
    keymaps: state.entities.device.keymaps,
    remaps: state.app.remaps,
  };
};
export type KeyboardsStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    onClickLayerNumber: (layer: number) => {
      _dispatch(KeyboardsActions.clearSelectedPos());
      _dispatch(KeyboardsActions.updateSelectedLayer(layer));
    },
  };
};

export type KeyboardsActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Keyboards);
