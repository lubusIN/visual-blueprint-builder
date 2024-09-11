/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { moveTo } from '@wordpress/icons';
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
	const { fromPath, toPath } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={moveTo}
				label="Move File or Directory"
				instructions={!isSelected && `from ${fromPath || '{from path}'} to ${toPath || '{to path}'}`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={attributes}
							fields={[
								{
									id: 'fromPath',
									label: 'From Path',
									type: 'text'
								},
								{
									id: 'toPath',
									label: 'To Path',
									type: 'text'
								},
							]}
							form={{
								fields: [
									'fromPath',
									'toPath'
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
