/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { plugins } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const { pluginName, pluginPath } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={plugins}
				label="Activate Plugin"
				instructions={!isSelected && `${pluginName || 'Plugin Name'} > ${pluginPath || 'Plugin Path'}`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={attributes}
							fields={[
								{
									id: 'pluginName',
									label: 'Plugin Name',
									type: 'text',
									placeholder: 'Enter plugin name'
								},
								{
									id: 'pluginPath',
									label: 'Plugin Path',
									type: 'text',
									placeholder: 'Enter the full path to the plugin'
								},
							]}
							form={{
								fields: [
									'pluginName',
									'pluginPath'
								]
							}}
							onChange={setAttributes}
						/>
					</VStack>
				)}
			</Placeholder>
		</p>
	);
}
