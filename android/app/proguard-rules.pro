# Necessary for react-native-config
-keep class com.frota.BuildConfig { *; }

# Necessary for react-native-svg
-keep public class com.horcrux.svg.** {*;}

# Necessary for react-native-fast-image
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}
