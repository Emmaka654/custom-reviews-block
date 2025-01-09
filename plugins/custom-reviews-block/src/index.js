import {registerBlockType} from '@wordpress/blocks';
import {RichText, MediaUpload} from '@wordpress/block-editor';
import {Button} from '@wordpress/components';
import {__} from '@wordpress/i18n';

registerBlockType('custom-reviews-block/reviews', {
    title: __('Отзывы', 'custom-reviews-block'),
    icon: 'format-quote',
    category: 'widgets',
    attributes: {
        clientName: {
            type: 'string',
            default: '',
        },
        reviewText: {
            type: 'string',
            default: '',
        },
        clientImage: {
            type: 'string',
            default: '',
        },
        layout: {
            type: 'string',
            default: 'default',
        },
    },

    edit: (props) => {
        const {attributes, setAttributes} = props;
        const {clientName, reviewText, clientImage, layout} = attributes;

        const onChangeClientName = (newName) => {
            setAttributes({clientName: newName});
        };

        const onChangeReviewText = (newText) => {
            setAttributes({reviewText: newText});
        };

        const onSelectImage = (newImage) => {
            setAttributes({clientImage: newImage.url});
        };

        const onChangeLayout = (event) => {
            setAttributes({layout: event.target.value});
        };

        return (
            <div className={`custom-reviews-block layout-${layout}`}>
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={clientImage}
                    render={({open}) => (
                        <Button onClick={open} isPrimary>
                            {clientImage ? __('Заменить фото', 'custom-reviews-block') : __('Добавить фото', 'custom-reviews-block')}
                        </Button>
                    )}
                />

                {clientImage && (
                    <img
                        src={clientImage}
                        alt={__('Фото клиента', 'custom-reviews-block')}
                        className="client-image"
                    />
                )}

                <RichText
                    tagName="h3"
                    placeholder={__('Имя клиента', 'custom-reviews-block')}
                    value={clientName}
                    onChange={onChangeClientName}
                />

                <RichText
                    tagName="p"
                    placeholder={__('Текст отзыва', 'custom-reviews-block')}
                    value={reviewText}
                    onChange={onChangeReviewText}
                />

                <div>
                    <label>
                        {__('Макет отзыва:', 'custom-reviews-block')}
                        <select value={layout} onChange={onChangeLayout}>
                            <option value="default">По умолчанию</option>
                            <option value="compact">Компактный</option>
                            <option value="full-width">Во всю ширину</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    },

    save: (props) => {
        const {attributes} = props;
        const {clientName, reviewText, clientImage, layout} = attributes;

        return (
            <div className={`custom-reviews-block layout-${layout}`}>
                {clientImage && (
                    <img
                        src={clientImage}
                        alt={__('Фото клиента', 'custom-reviews-block')}
                        className="client-image"
                    />
                )}
                <h3>{clientName}</h3>
                <RichText.Content tagName="p" value={reviewText}/>
            </div>
        );
    },
});