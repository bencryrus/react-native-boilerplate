## 1. Quick start
```bash
mkdir <app_name>
cd <app_name>
git clone https://github.com/bencryrus/react-native-boilerplate .
npm install
```


## 2. App name
[How to change the app name in react-native(in android and IOS):](https://dev.to/zenkoders/how-to-change-the-app-name-in-react-nativein-android-and-ios-573i)
### iOS
- Open in xcode
- Build settings → Packaging → Product name
- Update info.plist → Bundle display name

### Android
- Update `android/app/src/main/res/values/string.xml`
	```jsx
	<resources>
		<string name="app_name">App name</string>
		<string name="expo_splash_screen_resize_mode" translatable="false">contain</string>
		<string name="expo_splash_screen_status_bar_translucent" translatable="false">false</string>
	</resources>
	```
- `cd android`
- `./gradlew clean`


## 3. App link
[How to change the "Bundle Identifier" within React Native?](https://stackoverflow.com/questions/36119754/how-to-change-the-bundle-identifier-within-react-native)
[How to change bundle identifier of iOS app and package name of android app within react native app](https://medium.com/@devesu/how-to-change-bundle-identifier-of-ios-app-and-package-name-of-android-app-within-react-native-app-4fbdd6679aa2)
	
### iOS
- Xcode → General → Bundle identifier

### Android
Update the following files
- `android/app/BUCK file`
- `android/app/build.gradle file`
- main
    - `android/app/src/main/java/com/<app_name>`
    - `android/app/src/main/java/com/playground/MainActivity.java`
    - `android/app/src/main/java/com/playground/MainApplication.java`
    - `android/app/src/main/AndroidManifest.xml file`
- debug
    - `android/app/src/debug/java/com/<app_name>/ReactNativeFlipper.java`
    - `android/app/src/debug/java/com/<app_name>`
- release
    - `android/app/src/release/java/com/<app_name>`
    - `android/app/src/release/java/com/<app_name>/ReactNativeFlipper.java`


## 4. App icon
### Create icon images
- Image provided should not have any background
- Download the iOS + Adaptive icon option
- [EasyAppIcon - Create Mobile App Icon](https://easyappicon.com/)

### iOS
- Open xcode
- Update `app_name/Images`

### Android
- Copy the mipmap folders into `android/app/src/main/res`

### 5. Splash screen
[How to add a splash screen to a React Native app - The easy way](https://dev.to/lloyds-digital/how-to-add-a-splash-screen-to-a-react-native-app-the-easy-way-3ego)
### iOS
- Convert hex to iOS RGB [[link](https://www.uicolor.io/)]
- Update `AppDelegate.m`
	```jsx
	- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
	{
	self.moduleName = @"main";
	
	// You can add your custom initial props in the dictionary below.
	// They will be passed down to the ViewController used by React Native.
	self.initialProps = @{};
	
	BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
	if (success) {
		// Modify as needed to match the main color of your splash.
		self.window.rootViewController.view.backgroundColor = [UIColor colorWithRed:0.84 green:0.25 blue:0.56 alpha:1.0];
	}
	
	return success;
	}
	```
- Update `ios/<AppName>/LaunchScreen.storyboard`
	```jsx
	<?xml version="1.0" encoding="UTF-8"?>
	<document
	type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB"
	version="3.0"
	toolsVersion="16096"
	targetRuntime="iOS.CocoaTouch"
	propertyAccessControl="none"
	useAutolayout="YES"
	launchScreen="YES"
	useTraitCollections="YES"
	useSafeAreas="YES"
	colorMatched="YES"
	initialViewController="EXPO-VIEWCONTROLLER-1"
	>
	<device id="retina5_5" orientation="portrait" appearance="light"/>
	<dependencies>
		<deployment identifier="iOS"/>
		<plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="16087"/>
		<capability name="Safe area layout guides" minToolsVersion="9.0"/>
		<capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
	</dependencies>
	<scenes>
		<!--View Controller-->
		<scene sceneID="EXPO-SCENE-1">
		<objects>
			<viewController id="01J-lp-oVM" sceneMemberID="viewController">
				<view key="view" autoresizesSubviews="NO" opaque="NO" clearsContextBeforeDrawing="NO" userInteractionEnabled="NO" contentMode="scaleToFill" id="1L6-XZ-uwR">
					<rect key="frame" x="0.0" y="0.0" width="375" height="667"/>
					<autoresizingMask key="autoresizingMask" flexibleMaxX="YES" flexibleMaxY="YES"/>
					<viewLayoutGuide key="safeArea" id="VQL-mw-5y0"/>
					<!-- Change the color here -->
					<color key="backgroundColor" red="0.26" green="0.38" blue="0.93" alpha="1" colorSpace="calibratedRGB"/>
				</view>
			</viewController>
			<placeholder placeholderIdentifier="IBFirstResponder" id="EXPO-PLACEHOLDER-1" userLabel="First Responder" sceneMemberID="firstResponder"/>
		</objects>
		<point key="canvasLocation" x="140.625" y="129.4921875"/>
		</scene>
	</scenes>
	<resources>
		<image name="SplashScreen" width="414" height="736"/>
		<image name="SplashScreenBackground" width="1" height="1"/>
	</resources>
	</document>
	```
### Android
- Update `android/app/src/main/res/values/styles.xml`
	```jsx
	<resources>
		<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
			<item name="android:textColor">@android:color/black</item>
			<item name="android:editTextStyle">@style/ResetEditText</item>
			<item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
			<item name="android:windowIsTranslucent">false</item>
			<item name="android:windowBackground">@android:color/transparent</item>
		</style>
		<style name="ResetEditText" parent="@android:style/Widget.EditText">
			<item name="android:padding">0dp</item>
			<item name="android:textColorHint">#c8c8c8</item>
			<item name="android:textColor">@android:color/black</item>
		</style>
		<!-- Add this -->
		<style name="Theme.App.SplashScreen" parent="AppTheme">
			<item name="android:windowBackground">#4361ee</item>
		</style>
	</resources>
	```
- Update `android/app/src/main/res/values/colors.xml`
	```jsx
	<resources>
		<color name="splashscreen_background">#4361ee</color>
		<color name="ic_launcher_background">#4361ee</color>
	</resources>
	```

