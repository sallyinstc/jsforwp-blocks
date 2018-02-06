import './style.scss';
import './editor.scss';

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;
// Get registerBlockType and Editable from wp.blocks
const { registerBlockType, Editable } = wp.blocks;
// Set the h2 header for the block since it is reused
const blockHeader = <h2>{ __( 'Block Demo' ) }</h2>;

const blockIcon = {<svg width='20px' height='20px'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 75">
    <g fill="#000" fillRule="evenodd">
        <path d="M2,58 L58,58 L58,2 L2,2 L2,58 Z M59,60 L1,60 C0.447,60 0,59.552 0,59 L0,1 C0,0.448 0.447,0 1,0 L59,0 C59.553,0 60,0.448 60,1 L60,59 C60,59.552 59.553,60 59,60 L59,60 Z"
        />
        <path d="M46,55 C41.037,55 37,50.962 37,46 C37,45.448 37.447,45 38,45 C38.553,45 39,45.448 39,46 C39,49.86 42.141,53 46,53 C49.859,53 53,49.86 53,46 C53,42.14 49.859,39 46,39 C41.037,39 37,34.962 37,30 C37,25.038 41.037,21 46,21 C50.963,21 55,25.038 55,30 C55,30.552 54.553,31 54,31 C53.447,31 53,30.552 53,30 C53,26.14 49.859,23 46,23 C42.141,23 39,26.14 39,30 C39,33.86 42.141,37 46,37 C50.963,37 55,41.038 55,46 C55,50.962 50.963,55 46,55"
        />
        <path d="M25,55 C20.037,55 16,50.962 16,46 C16,45.448 16.447,45 17,45 C17.553,45 18,45.448 18,46 C18,49.86 21.141,53 25,53 C28.859,53 32,49.86 32,46 L32,22 C32,21.448 32.447,21 33,21 C33.553,21 34,21.448 34,22 L34,46 C34,50.962 29.963,55 25,55"
        />
    </g>

</svg>;}

/**
 * Register example block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'jsforwp/register-demo',
    {
        // Localize title using wp.i18n.__()
        title: __( 'registerBlockType - Example' ),
        // Category Options: common, formatting, layout, widgets, embed
        category: 'widgets',
        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: blockIcon,
        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'Example' ),
            __( 'Project' ),
            __( 'Code Samples' ),
        ],
        // Set for each piece of dynamic data used in your block
        attributes: {
            content: {
                type: 'array',
                source: 'children',
                selector: 'div.my-content',
            },
        },
        // Determines what is displayed in the editor
        edit: props => {
            // Event handler to update the value of the content when changed in editor
            const onChangeContent = value => {
                props.setAttributes( { content: value } );
            };
            // Return the markup displayed in the editor, including a core Editable field
            return <div className={props.className}>
                { blockHeader }
                <Editable
                    tagname="div"
                    multiline="p"
                    className="my-content"
                    placeholder={ __( 'Enter your ipsum here..' ) }
                    value={ props.attributes.content }
                    onChange={ onChangeContent }
                />
            </div>;
        },
        // Determines what is displayed on the frontend
        save: props => {
            // Return the markup to display on the frontend
            return (
                <div className={ props.className }>
                    { blockHeader }
                    <div className="my-content">
                      { props.attributes.content }
                    </div>
                </div>
            );
        },
    },
);
