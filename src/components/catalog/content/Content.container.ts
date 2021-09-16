import { connect } from 'react-redux';
import {
  CatalogAppActions,
  CatalogKeyboardActions,
} from '../../../actions/catalog.action';
import { RootState } from '../../../store/state';
import Content from './Content';

const mapStateToProps = (state: RootState) => {
  return {
    definitionDocument: state.entities.keyboardDefinitionDocument,
    phase: state.catalog.app.phase,
  };
};
export type ContentStateType = ReturnType<typeof mapStateToProps>;

/* eslint-disable-next-line no-unused-vars */
const mapDispatchToProps = (_dispatch: any) => {
  return {
    goToKeymap: () => {
      _dispatch(CatalogKeyboardActions.clearKeymap());
      _dispatch(CatalogAppActions.updatePhase('keymap'));
    },
    goToIntroduction: () => {
      _dispatch(CatalogAppActions.updatePhase('introduction'));
    },
  };
};
export type ContentActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Content);
