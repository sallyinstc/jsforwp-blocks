/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
  registerBlockType,
  Editable
} = wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
    'jsforwp/editable',
    {
        title: __( 'Example - Editable' ),
        category: 'common',
        icon: icon,
        keywords: [
            __( 'Banner' ),
            __( 'Call to Action' ),
            __( 'Message' ),
        ],
        attributes: {
          message: {
            type: 'array',
            source: 'children',
            selector: '.message-body',
          }
          title: {
            type: 'array',
            source: 'children',
            selector: '.message-title',
          }
        },
        edit: props => {
          const onChangeTitle = value => {
            props.setAttributes( { title: value } );
          };
          const onChangeMessage = value => {
            props.setAttributes( { message: value } );
          };
          return (
            <div className={ props.className }>
              <Editable
                tagName="h2"
                placeholder={ __( 'Add your custom message' ) }
      					onChange={ onChangeMessage }
      					value={ props.attributes.title }
      				/>
              <Editable
                tagName="div"
                placeholder={ __( 'Add your custom message' ) }
      					onChange={ onChangeMessage }
      					value={ props.attributes.message }
      				/>
            </div>
          );
        },
        save: props => {
          return (
            <div>
              <h2 className="message-title">{ props.attributes.title }</h2>
              <div class="message-body">
                { props.attributes.message }
              </div>
            </div>
          );
        },
    },
);
