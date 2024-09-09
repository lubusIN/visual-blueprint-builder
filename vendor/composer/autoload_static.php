<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit512d1fc7cf86404d62e199ad668cfb65
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Lubus\\Admin\\BlockEditorForPlaygroundBlueprint\\BlueprintPostType' => __DIR__ . '/../..' . '/inc/admin/class-register-post-type.php',
        'Lubus\\Admin\\BlockEditorForPlaygroundBlueprint\\BlueprintSteps' => __DIR__ . '/../..' . '/inc/admin/class-register-steps.php',
        'Lubus\\Admin\\BlockEditorForPlaygroundBlueprint\\EnqueueScripts' => __DIR__ . '/../..' . '/inc/admin/class-enqueue-scripts.php',
        'Lubus\\Admin\\BlockEditorForPlaygroundBlueprint\\RegisterCustomMeta' => __DIR__ . '/../..' . '/inc/admin/register-meta.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit512d1fc7cf86404d62e199ad668cfb65::$classMap;

        }, null, ClassLoader::class);
    }
}
